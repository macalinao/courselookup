import _ from 'lodash';
import cheerio from 'cheerio';
import request from 'superagent-bluebird-promise';

const BASE = 'http://catalog.utdallas.edu/2014/undergraduate/programs/';

let degreeId = process.argv[2];

request.get(BASE + degreeId).promise().then((data) => {
  let $ = cheerio.load(data.text);

  // Part 1 -- core curriculum
  let cat = $('.cat-reqa').filter(function() {
    return $(this).text().trim().startsWith('I.');
  })[0];
  let degree = $(cat).prevAll('h3').first().text();

  let groups = [];
  let group = {
    title: 'Core Curriculum Requirements',
    degree,
    classes: [],
    suggestion: true
  };
  groups.push(group);

  let p = $(cat).next();
  while (!p.hasClass('cat-reqa')) {

    let text = p.text().trim();
    let className = $(p).find('a').first().text();
    p = $(p).next();
    if (!className || !/^[A-Z]{2,4}/.test(className)) {
      continue;
    }

    if (text.startsWith('or')) {
      let end = group.classes[group.classes.length - 1];
      if (!Array.isArray(end)) {
        end = [end];
        group.classes[group.classes.length - 1] = end;
      }
      end.push(className);
    } else {
      group.classes.push(className);
    }

  }

  // Part 2
  let s = $(p).next();

  while (!s.hasClass('cat-reqa')) {
    if (s.hasClass('cat-reqg')) {
      let titleSplit = s.text().split(':');

      // Remove duplicates if we're making a new group
      if (group.classes) {
        group.classes = _.uniq(group.classes);
      }

      group = {
        title: titleSplit[0].trim(),
        credits: parseInt(titleSplit[1].trim().split(' ')[0]),
        degree: degree,
        classes: []
      };
      groups.push(group);

    } else if (s.hasClass('cat-reqi')) {
      let text = s.text();

      if (text.trim().startsWith('or')) {
        let end = group.classes[group.classes.length - 1];
        if (!Array.isArray(end)) {
          end = [end];
          group.classes[group.classes.length - 1] = end;
        }
        end.push($(s).find('a').first().text());
      } else {

        if (!/^[A-Z]{2,4} [\d]{4}/.test(text.trim())) {
          s = s.next();
          continue;
        }

        group.classes.push($(s).find('a').first().text());
      }

    }

    s = s.next();
  }

  console.log(JSON.stringify(groups, null, 2));

});
