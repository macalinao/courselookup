import cheerio from 'cheerio';
import request from 'superagent-bluebird-promise';

const BASE = 'http://catalog.utdallas.edu/2014/undergraduate/programs/';

let degreeId = process.argv[2];

request.get(BASE + degreeId).promise().then((data) => {
  let $ = cheerio.load(data.text);
  let cat = $('.cat-reqa').filter(function() {
    return $(this).text().trim().startsWith('II');
  })[0];

  let degree = $(cat).prevAll('h3').first().text();

  let s = $(cat).next();

  let groups = [];
  let group = null;

  while (!s.hasClass('cat-reqa')) {
    if (s.hasClass('cat-reqg')) {
      let titleSplit = s.text().split(':');
      group = {
        title: titleSplit[0].trim(),
        credits: parseInt(titleSplit[1].trim().split(' ')[0]),
        degree: degree,
        classes: []
      };
      groups.push(group);

    } else if (s.hasClass('cat-reqi')) {
      let text = s.text();

      if (!/^[A-Z]{2,4} [\d]{4}/.test(text.trim())) {
        s = s.next();
        continue;
      }

      if (text.trim().startsWith('or')) {
        let end = group.classes[group.classes.length - 1];
        if (!Array.isArray(end)) {
          end = [end];
          group.classes[group.classes.length - 1] = end;
        }
        end.push($(s).find('a').first().text());
      } else {
        group.classes.push($(s).find('a').first().text());
      }

    }
    s = s.next();
  }

  console.log(JSON.stringify(groups, null, 2));

});
