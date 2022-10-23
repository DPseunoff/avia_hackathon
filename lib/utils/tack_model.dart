import 'package:avia_hackathon/utils/enums.dart';

// Класс задания
class TaskModel {
  TaskModel({
    this.taskId = '',
    this.startRoute = '',
    this.middleRoute = '',
    this.endRoute = '',
    this.timeStart = '',
    this.timeToMiddle = '',
    this.timeToEnd = '',
    this.timeForExecute = '',
    this.passengersNumber = 0,
    this.taskType = TaskType.unknown,
    this.busMates = const [],
  });

  String taskId;  // id таска
  String startRoute;  // пункт начала пути
  String middleRoute; // пункт погрузки пассажиров
  String endRoute;  // пункт выгрузки пассажирова
  String timeStart; // время начала выполнения
  String timeToMiddle;  // время выполнения проезда до погрузки пассажиров
  String timeToEnd;  // время выполнение проезда до выгрузки пассажиров
  String timeForExecute;  // общее время на выпонение задания
  int passengersNumber; // кол-во пассажирова
  TaskType taskType;  // тип задания
  List<int> busMates; // возможные номера автобусов, которые выполняют то же задание
}
