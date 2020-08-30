/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MentorDetailComponent from '@/entities/mentor/mentor-details.vue';
import MentorClass from '@/entities/mentor/mentor-details.component';
import MentorService from '@/entities/mentor/mentor.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Mentor Management Detail Component', () => {
    let wrapper: Wrapper<MentorClass>;
    let comp: MentorClass;
    let mentorServiceStub: SinonStubbedInstance<MentorService>;

    beforeEach(() => {
      mentorServiceStub = sinon.createStubInstance<MentorService>(MentorService);

      wrapper = shallowMount<MentorClass>(MentorDetailComponent, { store, localVue, provide: { mentorService: () => mentorServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMentor = { id: 123 };
        mentorServiceStub.find.resolves(foundMentor);

        // WHEN
        comp.retrieveMentor(123);
        await comp.$nextTick();

        // THEN
        expect(comp.mentor).toBe(foundMentor);
      });
    });
  });
});
