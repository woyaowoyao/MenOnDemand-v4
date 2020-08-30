import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMentor } from '@/shared/model/mentor.model';
import MentorService from './mentor.service';

@Component
export default class MentorDetails extends Vue {
  @Inject('mentorService') private mentorService: () => MentorService;
  public mentor: IMentor = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.mentorId) {
        vm.retrieveMentor(to.params.mentorId);
      }
    });
  }

  public retrieveMentor(mentorId) {
    this.mentorService()
      .find(mentorId)
      .then(res => {
        this.mentor = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
