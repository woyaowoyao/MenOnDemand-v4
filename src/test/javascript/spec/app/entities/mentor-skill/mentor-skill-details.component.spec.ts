/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MentorSkillDetailComponent from '@/entities/mentor-skill/mentor-skill-details.vue';
import MentorSkillClass from '@/entities/mentor-skill/mentor-skill-details.component';
import MentorSkillService from '@/entities/mentor-skill/mentor-skill.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('MentorSkill Management Detail Component', () => {
    let wrapper: Wrapper<MentorSkillClass>;
    let comp: MentorSkillClass;
    let mentorSkillServiceStub: SinonStubbedInstance<MentorSkillService>;

    beforeEach(() => {
      mentorSkillServiceStub = sinon.createStubInstance<MentorSkillService>(MentorSkillService);

      wrapper = shallowMount<MentorSkillClass>(MentorSkillDetailComponent, {
        store,
        localVue,
        provide: { mentorSkillService: () => mentorSkillServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMentorSkill = { id: 123 };
        mentorSkillServiceStub.find.resolves(foundMentorSkill);

        // WHEN
        comp.retrieveMentorSkill(123);
        await comp.$nextTick();

        // THEN
        expect(comp.mentorSkill).toBe(foundMentorSkill);
      });
    });
  });
});
