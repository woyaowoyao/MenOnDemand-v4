import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import TechnologyService from '../technology/technology.service';
import { ITechnology } from '@/shared/model/technology.model';

import MentorService from '../mentor/mentor.service';
import { IMentor } from '@/shared/model/mentor.model';

import AlertService from '@/shared/alert/alert.service';
import { IMentorSkill, MentorSkill } from '@/shared/model/mentor-skill.model';
import MentorSkillService from './mentor-skill.service';

const validations: any = {
  mentorSkill: {
    selfRate: {},
    experience: {},
  },
};

@Component({
  validations,
})
export default class MentorSkillUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('mentorSkillService') private mentorSkillService: () => MentorSkillService;
  public mentorSkill: IMentorSkill = new MentorSkill();

  @Inject('technologyService') private technologyService: () => TechnologyService;

  public technologies: ITechnology[] = [];

  @Inject('mentorService') private mentorService: () => MentorService;

  public mentors: IMentor[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.mentorSkillId) {
        vm.retrieveMentorSkill(to.params.mentorSkillId);
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
    if (this.mentorSkill.id) {
      this.mentorSkillService()
        .update(this.mentorSkill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A MentorSkill is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.mentorSkillService()
        .create(this.mentorSkill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A MentorSkill is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveMentorSkill(mentorSkillId): void {
    this.mentorSkillService()
      .find(mentorSkillId)
      .then(res => {
        this.mentorSkill = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.technologyService()
      .retrieve()
      .then(res => {
        this.technologies = res.data;
      });
    this.mentorService()
      .retrieve()
      .then(res => {
        this.mentors = res.data;
      });
  }
}
