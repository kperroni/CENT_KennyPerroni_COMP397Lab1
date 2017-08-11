package week3;

import java.security.SecureRandom;

public class Craps {

	// Create a random number generator
	private static final SecureRandom randomNumbers = new SecureRandom();

	// Create enum with game status
	private enum Status {
		CONTINUE, WON, LOST
	};

	// Constants that represent common rolls
	private static final int SNAKE_EYES = 2;
	private static final int TREY = 3;
	private static final int SEVEN = 7;
	private static final int ELEVEN = 11;
	private static final int BOX_CARS = 12;

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int myPoint = 0;
		Status gameStatus;

		int sumOfDice = rollDice();

		switch (sumOfDice) {

		case SEVEN: // Win with a roll of 7 on a first roll
		case ELEVEN: // Win with a roll of 11 on a first roll
			gameStatus = Status.WON;
			break;

		case SNAKE_EYES: // Lose with 2
		case TREY: // Lose with 3
		case BOX_CARS: // Lose with 12
			gameStatus = Status.LOST;
			break;

		default:
			gameStatus = Status.CONTINUE; // Rolled a 4,5,6,8,9,10
			myPoint = sumOfDice;
			System.out.printf("Point is %d%n", myPoint);
			break;

		}

		// Roll until myPoint is rolled or a 7 is rolled
		while (gameStatus == Status.CONTINUE) {

			sumOfDice = rollDice();

			// Determine game status

			if (sumOfDice == myPoint)
				gameStatus = Status.WON;

			else if (sumOfDice == SEVEN)
				gameStatus = Status.LOST;
		}

		// Display win or lose message based on gameSatatus
		if (gameStatus == Status.WON)
			System.out.println("Player Wins!");

		else
			System.out.println("Player Loses =(");

	}

	public static int rollDice() {

		// Pick random die values
		int die1 = 1 + randomNumbers.nextInt(6);
		int die2 = 1 + randomNumbers.nextInt(6);

		// Add both die together
		int sum = die1 + die2;

		System.out.printf("Player rolled %d + %d = %d%n", die1, die2, sum);

		return sum;
	}

}
