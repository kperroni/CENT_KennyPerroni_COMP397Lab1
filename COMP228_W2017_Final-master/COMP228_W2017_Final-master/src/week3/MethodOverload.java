package week3;

public class MethodOverload {

	//Test
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.printf("Square of integer 7 is: %d%n", square(7));
		System.out.printf("Square of integer 7.5 is: %f%n", square(7.5));
	}
	
	//Square an int value
	public static int square(int intValue){

	System.out.printf("%nCalled square with in argument: %d%n", intValue);
	return intValue * intValue;
	}
	
	//Square a double value
	public static double square(double doubleValue){
		
		System.out.printf("%nCalled square with double argument: %f%n", doubleValue);
		return doubleValue * doubleValue;
	}
}
