// Состояния всплывающего диалогового окна
enum DialogState {
  takingRest,
  doneRest,
  alert,
  exit,
}

// Состояния главного экрана
enum HomeState {
  taskWaiting,
  taskDone,
  loading,
  resting,
}

// Тип задания (посадка или высадка)
enum TaskType {
  takeOff, landing, unknown
}
