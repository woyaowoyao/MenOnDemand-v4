import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMentor } from '@/shared/model/mentor.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import MentorService from './mentor.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Mentor extends mixins(AlertMixin) {
  @Inject('mentorService') private mentorService: () => MentorService;
  private removeId: number = null;

  public mentors: IMentor[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMentors();
  }

  public clear(): void {
    this.retrieveAllMentors();
  }

  public retrieveAllMentors(): void {
    this.isFetching = true;

    this.mentorService()
      .retrieve()
      .then(
        res => {
          this.mentors = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IMentor): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMentor(): void {
    this.mentorService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Mentor is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllMentors();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
