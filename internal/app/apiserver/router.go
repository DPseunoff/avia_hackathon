package apiserver

func (srv *Server) createRoutes() {
	// srv.router.LoadHTMLGlob("./ui/templates/*")
	// srv.router.Static("/static", "./ui/static/")

	srv.Router.GET("/tasks", srv.getTasks)
	srv.Router.GET("/tasks/:id", srv.getBusTasks)
	srv.Router.GET("/flights", srv.getFlights)
	srv.Router.GET("/buses", srv.getBuses)
	srv.Router.POST("/task/change", srv.changeTask)
	srv.Router.POST("/task/start", srv.startTask)
	srv.Router.POST("/task/complete", srv.completeTask)
}