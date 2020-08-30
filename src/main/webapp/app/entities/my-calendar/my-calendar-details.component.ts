import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMyCalendar } from '@/shared/model/my-calendar.model';
import MyCalendarService from './my-calendar.service';

@Component
export default class MyCalendarDetails extends Vue {
  @Inject('myCalendarService') private myCalendarService: () => MyCalendarService;
  public myCalendar: IMyCalendar = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.myCalendarId) {
        vm.retrieveMyCalendar(to.params.myCalendarId);
      }
    });
  }

  public retrieveMyCalendar(myCalendarId) {
    this.myCalendarService()
      .find(myCalendarId)
      .then(res => {
        this.myCalendar = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
