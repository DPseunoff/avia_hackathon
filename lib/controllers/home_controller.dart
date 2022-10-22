import 'package:avia_hackathon/utils/enums.dart';
import 'package:avia_hackathon/utils/tack_model.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  final state = HomeState.taskWaiting.obs;
  final taskList = <TaskModel>[].obs;


  void setState(HomeState newState) {
    state.value = newState;
  }
}