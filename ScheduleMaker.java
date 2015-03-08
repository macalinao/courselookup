public class ScheduleMaker{
    public static void main(String[] args){
	//import the given courses into array
	Scanner input = new Scanner(new File(courses.txt));
	
    }

    public static String excutePost(String targetURL, String urlParameters) {
	URL url;
	HttpURLConnection connection = null;  
	try {
	    //Create connection
	    url = new URL(targetURL);
	    Connection = (HttpURLConnection)url.openConnection();
	    connection.setRequestMethod("POST");
	    connection.setRequestProperty("Content-Type", 
					  "application/x-www-form-urlencoded");

	    connection.setRequestProperty("Content-Length", "" + 
					  Integer.toString(urlParameters.getBytes().length));
	    connection.setRequestProperty("Content-Language", "en-US");  

	    connection.setUseCaches (false);
	    connection.setDoInput(true);
	    connection.setDoOutput(true);

	    //Send request
	    DataOutputStream wr = new DataOutputStream (
							connection.getOutputStream ());
	    wr.writeBytes (urlParameters);
	    wr.flush ();
	    wr.close ();

	    //Get Response    
	    InputStream is = connection.getInputStream();
	    BufferedReader rd = new BufferedReader(new InputStreamReader(is));
	    String line;
	    StringBuffer response = new StringBuffer(); 
	    while((line = rd.readLine()) != null) {
		response.append(line);
		response.append('\r');
	    }
	    rd.close();
	    return response.toString();

	} catch (Exception e) {

	    e.printStackTrace();
	    return null;

	} finally {
	
	    if(connection != null) {
		connection.disconnect(); 
	    }
	}
    }
}
