/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MentorComponent from '@/entities/mentor/mentor.vue';
import MentorClass from '@/entities/mentor/mentor.component';
import MentorService from '@/entities/mentor/mentor.service';

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
  describe('Mentor Management Component', () => {
    let wrapper: Wrapper<MentorClass>;
    let comp: MentorClass;
    let mentorServiceStub: SinonStubbedInstance<MentorService>;

    beforeEach(() => {
      mentorServiceStub = sinon.createStubInstance<MentorService>(MentorService);
      mentorServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MentorClass>(MentorComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          mentorService: () => mentorServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      mentorServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMentors();
      await comp.$nextTick();

      // THEN
      expect(mentorServiceStub.retrieve.called).toBeTruthy();
      expect(comp.mentors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      mentorServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeMentor();
      await comp.$nextTick();

      // THEN
      expect(mentorServiceStub.delete.called).toBeTruthy();
      expect(mentorServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
