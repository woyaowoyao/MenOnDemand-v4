/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MentorSkillUpdateComponent from '@/entities/mentor-skill/mentor-skill-update.vue';
import MentorSkillClass from '@/entities/mentor-skill/mentor-skill-update.component';
import MentorSkillService from '@/entities/mentor-skill/mentor-skill.service';

import TechnologyService from '@/entities/technology/technology.service';

import MentorService from '@/entities/mentor/mentor.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('MentorSkill Management Update Component', () => {
    let wrapper: Wrapper<MentorSkillClass>;
    let comp: MentorSkillClass;
    let mentorSkillServiceStub: SinonStubbedInstance<MentorSkillService>;

    beforeEach(() => {
      mentorSkillServiceStub = sinon.createStubInstance<MentorSkillService>(MentorSkillService);

      wrapper = shallowMount<MentorSkillClass>(MentorSkillUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          mentorSkillService: () => mentorSkillServiceStub,

          technologyService: () => new TechnologyService(),

          mentorService: () => new MentorService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.mentorSkill = entity;
        mentorSkillServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mentorSkillServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.mentorSkill = entity;
        mentorSkillServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mentorSkillServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
