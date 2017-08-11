package week3;

public class Scope {

	private static int x = 1;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int x = 5;
		
		System.out.printf("Local variable x in main is %d%n", x);
		
		useLocalVariable();
		useField();
		useLocalVariable();
		useField();
	}
	
	//Using local variable
	public static void useLocalVariable(){
		
		int x = 25;
		
		System.out.printf("%nLocal x on entering method useLocalVariable is %d%n", x);
		x++;
		System.out.printf("%nLocal x before exiting method useLocalVariable is %d%n", x);
	}
	
	//Using field variable
	public static void useField(){
		
		System.out.printf("%nField x on entering method useField is %d%n", x);
		x *= 10; //x = x * 10;
		System.out.printf("Field x before exiting method useField is %d%n", x);
		
	}

}
