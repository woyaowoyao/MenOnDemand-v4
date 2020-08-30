import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IMentor, Mentor } from '@/shared/model/mentor.model';
import MentorService from './mentor.service';

const validations: any = {
  mentor: {
    username: {
      required,
    },
    linkedin: {},
    regDatetime: {},
    regCode: {},
    experience: {},
    status: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class MentorUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('mentorService') private mentorService: () => MentorService;
  public mentor: IMentor = new Mentor();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.mentorId) {
        vm.retrieveMentor(to.params.mentorId);
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
    if (this.mentor.id) {
      this.mentorService()
        .update(this.mentor)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Mentor is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.mentorService()
        .create(this.mentor)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Mentor is created with identifier ' + param.id;
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
      this.mentor[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.mentor[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.mentor[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.mentor[field] = null;
    }
  }

  public retrieveMentor(mentorId): void {
    this.mentorService()
      .find(mentorId)
      .then(res => {
        res.regDatetime = new Date(res.regDatetime);
        this.mentor = res;
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
  }
}
