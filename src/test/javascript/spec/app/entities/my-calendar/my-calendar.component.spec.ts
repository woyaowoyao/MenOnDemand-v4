/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MyCalendarComponent from '@/entities/my-calendar/my-calendar.vue';
import MyCalendarClass from '@/entities/my-calendar/my-calendar.component';
import MyCalendarService from '@/entities/my-calendar/my-calendar.service';

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
  describe('MyCalendar Management Component', () => {
    let wrapper: Wrapper<MyCalendarClass>;
    let comp: MyCalendarClass;
    let myCalendarServiceStub: SinonStubbedInstance<MyCalendarService>;

    beforeEach(() => {
      myCalendarServiceStub = sinon.createStubInstance<MyCalendarService>(MyCalendarService);
      myCalendarServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MyCalendarClass>(MyCalendarComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          myCalendarService: () => myCalendarServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      myCalendarServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMyCalendars();
      await comp.$nextTick();

      // THEN
      expect(myCalendarServiceStub.retrieve.called).toBeTruthy();
      expect(comp.myCalendars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      myCalendarServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeMyCalendar();
      await comp.$nextTick();

      // THEN
      expect(myCalendarServiceStub.delete.called).toBeTruthy();
      expect(myCalendarServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
