//course.java is a class for courses that will be sorted later.
public class Course{
    String name;
    int courseID;
    Course[] prereqs;
    public Course(String n, int id, Course[] prs){
	name = n;
	id = courseID;
	prereqs = prs;
    }

    public String getName(){return name;}
    public int getID(){return courseID;}
    public Course[] getPrereqs(){return prereqs;} 
}
