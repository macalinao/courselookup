//This is a class for a specific section of a course

int startTime;
int endTime;
int sectionID;
boolean[] daysOfWeek;
boolean full;

public class Section extends Course{
    

    public section(int start, int end, boolean[7] days, boolean f, int id){
	super();
	startTime = start;
	endTime = end;
	daysOfWeek = days;
	full = f;
	sectionID = id;
    }

    public int sectionID(){return sectionID;}
    public int courseID(){return sectionID;}
    public int getStart(){return startTime;}
    public int getEnd(){return endTime;}
    public boolan isFull(){return full;}
    public boolean[] getDays(){return daysOfWeek;}
}
