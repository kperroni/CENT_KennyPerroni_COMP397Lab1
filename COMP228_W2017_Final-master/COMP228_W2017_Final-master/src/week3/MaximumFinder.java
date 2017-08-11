package week3;

import java.util.Scanner;

public class MaximumFinder {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner input = new Scanner(System.in);
		
		//Prompt the user to enter values
		System.out.println("Enter three floating-point values separated by spaces: ");
		
		//Store values into variables
		double number1 = input.nextDouble();
		double number2 = input.nextDouble();
		double number3 = input.nextDouble();
		
		double result = maximum(number1, number2, number3);
		
		System.out.println("Maximum is: "+result);

	}
	
	public static double maximum(double x, double y, double z){
		double maximumValue = x;
		
		if(y > maximumValue)
			maximumValue = y;
		
		if(z > maximumValue)
			maximumValue = z;
		
		return maximumValue;
	}

}
