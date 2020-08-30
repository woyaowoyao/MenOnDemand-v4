import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import TrainingService from '../training/training.service';
import { ITraining } from '@/shared/model/training.model';

import TechnologyService from '../technology/technology.service';
import { ITechnology } from '@/shared/model/technology.model';

import AlertService from '@/shared/alert/alert.service';
import { ITrainingRecord, TrainingRecord } from '@/shared/model/training-record.model';
import TrainingRecordService from './training-record.service';

const validations: any = {
  trainingRecord: {
    status: {
      required,
    },
    progress: {
      required,
    },
    commissionAmount: {
      required,
      numeric,
    },
    avgRating: {},
    amountReceived: {
      required,
      numeric,
    },
    userName: {},
    fees: {
      required,
      numeric,
    },
    remarks: {},
  },
};

@Component({
  validations,
})
export default class TrainingRecordUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('trainingRecordService') private trainingRecordService: () => TrainingRecordService;
  public trainingRecord: ITrainingRecord = new TrainingRecord();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('trainingService') private trainingService: () => TrainingService;

  public trainings: ITraining[] = [];

  @Inject('technologyService') private technologyService: () => TechnologyService;

  public technologies: ITechnology[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.trainingRecordId) {
        vm.retrieveTrainingRecord(to.params.trainingRecordId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.trainingRecord.id) {
      this.trainingRecordService()
        .update(this.trainingRecord)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TrainingRecord is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.trainingRecordService()
        .create(this.trainingRecord)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TrainingRecord is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTrainingRecord(trainingRecordId): void {
    this.trainingRecordService()
      .find(trainingRecordId)
      .then(res => {
        this.trainingRecord = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.trainingService()
      .retrieve()
      .then(res => {
        this.trainings = res.data;
      });
    this.technologyService()
      .retrieve()
      .then(res => {
        this.technologies = res.data;
      });
  }
}
