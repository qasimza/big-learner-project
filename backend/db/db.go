package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	// Initialize connection constants.
	HOST     = "big-db-develop.postgres.database.azure.com"
	DATABASE = "big_db"
	USER     = "TestRole"
	PASSWORD = "TestAccess"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

type Reservation struct {
	ReservationId     string         `json:"reservationId"`
	ReservationNumber string         `json:"reservationNumber"`
	Name              string         `json:"name"`
	Email             string         `json:"email"`
	ReservationType   string         `json:"reservationType"`
	CreatedTimestamp  string         `json:"createdTimestamp"`
	ModifiedTimestamp string         `json:"modifiedTimestamp"`
	PaymentId         sql.NullString `json:"paymentId"`
	ShortId           string         `json:"shortId"`
}

func createConnection() *sql.DB {
	// Initialize connection string.
	var connectionString string = fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=require", HOST, USER, PASSWORD, DATABASE)

	// Initialize connection object.
	db, err := sql.Open("postgres", connectionString)
	checkError(err)

	err = db.Ping()
	checkError(err)
	fmt.Println("Successfully created connection to database")
	return db
}

var DB_CONN = createConnection()

func GetReservations(reservationType string, numReservations int) []Reservation {

	//Generate SQL Statement based on input reservation type
	var sqlStatement string

	switch reservationType {
	case "priority", "standard", "partner":
		sqlStatement = fmt.Sprintf("SELECT * from reservations WHERE UPPER(reservation_type) = UPPER('%v') ORDER BY created_timestamp DESC;", reservationType)
	case "*":
		sqlStatement = "SELECT * from reservations ORDER BY created_timestamp DESC;"
	default:
		panic("Incorrect Reservation Type")
	}

	rows, err := DB_CONN.Query(sqlStatement)
	checkError(err)
	defer rows.Close()

	// Get top numReservations reservations for given type
	reservations := []Reservation{}
	for rows.Next() {
		var reservation = new(Reservation)
		switch err := rows.Scan(&reservation.ReservationId, &reservation.ReservationNumber, &reservation.Name,
			&reservation.Email, &reservation.ReservationType, &reservation.CreatedTimestamp,
			&reservation.ModifiedTimestamp, &reservation.PaymentId, &reservation.ShortId); err {
		case sql.ErrNoRows:
			fmt.Println("No rows were returned")
		case nil:
			reservations = append(reservations, *reservation)
		default:
			checkError(err)
		}
		if len(reservations) == numReservations {
			break
		}
	}
	return reservations
}

func GetReservationCount(reservationType string) int {

	//Generate SQL Statement based on input reservation type
	var sqlStatement string

	switch reservationType {
	case "priority", "standard", "partner":
		sqlStatement = fmt.Sprintf("SELECT COUNT(*) from reservations WHERE UPPER(reservation_type) = UPPER('%v')", reservationType)
	case "*":
		sqlStatement = "SELECT COUNT(*) FROM reservations;"
	default:
		panic("Incorrect Reservation Type")
	}

	//Get Count
	var count int

	counts, err := DB_CONN.Query(sqlStatement)
	checkError(err)
	defer counts.Close()

	counts.Next()
	switch err := counts.Scan(&count); err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned")
	case nil:
		//fmt.Printf("Count: = (%v)\n", count)
	default:
		checkError(err)
	}

	return count
}
