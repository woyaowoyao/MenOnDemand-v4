import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import TrainingService from '../training/training.service';
import { ITraining } from '@/shared/model/training.model';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IMyCalendar, MyCalendar } from '@/shared/model/my-calendar.model';
import MyCalendarService from './my-calendar.service';

const validations: any = {
  myCalendar: {
    calDate: {},
    duration: {},
    remarks: {},
  },
};

@Component({
  validations,
})
export default class MyCalendarUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('myCalendarService') private myCalendarService: () => MyCalendarService;
  public myCalendar: IMyCalendar = new MyCalendar();

  @Inject('trainingService') private trainingService: () => TrainingService;

  public trainings: ITraining[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.myCalendarId) {
        vm.retrieveMyCalendar(to.params.myCalendarId);
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
    if (this.myCalendar.id) {
      this.myCalendarService()
        .update(this.myCalendar)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A MyCalendar is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.myCalendarService()
        .create(this.myCalendar)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A MyCalendar is created with identifier ' + param.id;
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
      this.myCalendar[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.myCalendar[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.myCalendar[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.myCalendar[field] = null;
    }
  }

  public retrieveMyCalendar(myCalendarId): void {
    this.myCalendarService()
      .find(myCalendarId)
      .then(res => {
        res.calDate = new Date(res.calDate);
        this.myCalendar = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.trainingService()
      .retrieve()
      .then(res => {
        this.trainings = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
