import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMentorSkill } from '@/shared/model/mentor-skill.model';
import MentorSkillService from './mentor-skill.service';

@Component
export default class MentorSkillDetails extends Vue {
  @Inject('mentorSkillService') private mentorSkillService: () => MentorSkillService;
  public mentorSkill: IMentorSkill = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.mentorSkillId) {
        vm.retrieveMentorSkill(to.params.mentorSkillId);
      }
    });
  }

  public retrieveMentorSkill(mentorSkillId) {
    this.mentorSkillService()
      .find(mentorSkillId)
      .then(res => {
        this.mentorSkill = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
