import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITrainingRecord } from '@/shared/model/training-record.model';
import TrainingRecordService from './training-record.service';

@Component
export default class TrainingRecordDetails extends Vue {
  @Inject('trainingRecordService') private trainingRecordService: () => TrainingRecordService;
  public trainingRecord: ITrainingRecord = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.trainingRecordId) {
        vm.retrieveTrainingRecord(to.params.trainingRecordId);
      }
    });
  }

  public retrieveTrainingRecord(trainingRecordId) {
    this.trainingRecordService()
      .find(trainingRecordId)
      .then(res => {
        this.trainingRecord = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
