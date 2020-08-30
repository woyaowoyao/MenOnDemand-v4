import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMyCalendar } from '@/shared/model/my-calendar.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import MyCalendarService from './my-calendar.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MyCalendar extends mixins(AlertMixin) {
  @Inject('myCalendarService') private myCalendarService: () => MyCalendarService;
  private removeId: number = null;

  public myCalendars: IMyCalendar[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMyCalendars();
  }

  public clear(): void {
    this.retrieveAllMyCalendars();
  }

  public retrieveAllMyCalendars(): void {
    this.isFetching = true;

    this.myCalendarService()
      .retrieve()
      .then(
        res => {
          this.myCalendars = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IMyCalendar): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMyCalendar(): void {
    this.myCalendarService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A MyCalendar is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllMyCalendars();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
