import 'package:avia_hackathon/utils/enums.dart';
import 'package:avia_hackathon/utils/tack_model.dart';
import 'package:get/get.dart';
import 'package:avia_hackathon/utils/tests.dart' as t;

// Контроллер для реактивного стейт-менеджмента
class HomeController extends GetxController {
  final state = HomeState.taskWaiting.obs;
  final taskList = <String, TaskModel>{}.obs;

  // Метод подгрузки списка заданий
  Future<void> getTaskList() async {
    state.value = HomeState.loading;
    await Future.delayed(const Duration(milliseconds: 2000));
    for (final test in t.testArray) {
      taskList.addEntries([MapEntry(test.taskId, test)]);
    }
    state.value = HomeState.taskWaiting;
  }

  // Метод для обновления состояния главного экрана
  void setState(HomeState newState) {
    state.value = newState;
  }

  void setTaskStatusDone(String taskId) {
    taskList.remove(taskId);
  }
}