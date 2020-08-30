import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMentorSkill } from '@/shared/model/mentor-skill.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import MentorSkillService from './mentor-skill.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MentorSkill extends mixins(AlertMixin) {
  @Inject('mentorSkillService') private mentorSkillService: () => MentorSkillService;
  private removeId: number = null;

  public mentorSkills: IMentorSkill[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMentorSkills();
  }

  public clear(): void {
    this.retrieveAllMentorSkills();
  }

  public retrieveAllMentorSkills(): void {
    this.isFetching = true;

    this.mentorSkillService()
      .retrieve()
      .then(
        res => {
          this.mentorSkills = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IMentorSkill): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMentorSkill(): void {
    this.mentorSkillService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A MentorSkill is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllMentorSkills();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
