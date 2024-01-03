package restapi

import (
	"backend/db"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Response struct {
	All           []db.Reservation `json:"All"`
	Priority      []db.Reservation `json:"Priority"`
	Standard      []db.Reservation `json:"Standard"`
	Partner       []db.Reservation `json:"Partner"`
	TotalCount    int              `json:"TotalCount"`
	PriorityCount int              `json:"PriorityCount"`
	StandardCount int              `json:"StandardCount"`
	PartnerCount  int              `json:"PartnerCount"`
}

func RunApp() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/", getResponse)
	router.Run()
}

// getResponse responds with the list of all reservations as JSON.
func getResponse(c *gin.Context) {
	response := Response{
		All:           db.GetReservations("*", 10),
		Priority:      db.GetReservations("priority", 10),
		Standard:      db.GetReservations("standard", 10),
		Partner:       db.GetReservations("partner", 10),
		TotalCount:    db.GetReservationCount("*"),
		PriorityCount: db.GetReservationCount("priority"),
		StandardCount: db.GetReservationCount("standard"),
		PartnerCount:  db.GetReservationCount("partner")}
	c.IndentedJSON(http.StatusOK, response)
}
