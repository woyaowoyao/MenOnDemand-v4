/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MentorSkillComponent from '@/entities/mentor-skill/mentor-skill.vue';
import MentorSkillClass from '@/entities/mentor-skill/mentor-skill.component';
import MentorSkillService from '@/entities/mentor-skill/mentor-skill.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('MentorSkill Management Component', () => {
    let wrapper: Wrapper<MentorSkillClass>;
    let comp: MentorSkillClass;
    let mentorSkillServiceStub: SinonStubbedInstance<MentorSkillService>;

    beforeEach(() => {
      mentorSkillServiceStub = sinon.createStubInstance<MentorSkillService>(MentorSkillService);
      mentorSkillServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MentorSkillClass>(MentorSkillComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          mentorSkillService: () => mentorSkillServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      mentorSkillServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMentorSkills();
      await comp.$nextTick();

      // THEN
      expect(mentorSkillServiceStub.retrieve.called).toBeTruthy();
      expect(comp.mentorSkills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      mentorSkillServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeMentorSkill();
      await comp.$nextTick();

      // THEN
      expect(mentorSkillServiceStub.delete.called).toBeTruthy();
      expect(mentorSkillServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
