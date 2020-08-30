import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';
import { ITraining, Training } from '@/shared/model/training.model';
import TrainingService from './training.service';

const validations: any = {
  training: {
    status: {
      required,
    },
    name: {
      required,
    },
    commissionAmount: {
      required,
      numeric,
    },
    avgRating: {},
    startDate: {},
    endDate: {},
    remarks: {},
  },
};

@Component({
  validations,
})
export default class TrainingUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('trainingService') private trainingService: () => TrainingService;
  public training: ITraining = new Training();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.trainingId) {
        vm.retrieveTraining(to.params.trainingId);
      }
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
    if (this.training.id) {
      this.trainingService()
        .update(this.training)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Training is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.trainingService()
        .create(this.training)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Training is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.training[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.training[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.training[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.training[field] = null;
    }
  }

  public retrieveTraining(trainingId): void {
    this.trainingService()
      .find(trainingId)
      .then(res => {
        res.startDate = new Date(res.startDate);
        res.endDate = new Date(res.endDate);
        this.training = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
