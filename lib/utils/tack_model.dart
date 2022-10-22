import 'package:avia_hackathon/utils/enums.dart';

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

  String taskId;
  String startRoute;
  String middleRoute;
  String endRoute;
  String timeStart;
  String timeToMiddle;
  String timeToEnd;
  String timeForExecute;
  int passengersNumber;
  TaskType taskType;
  List<int> busMates;
}
