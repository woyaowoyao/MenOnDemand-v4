/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MyCalendarDetailComponent from '@/entities/my-calendar/my-calendar-details.vue';
import MyCalendarClass from '@/entities/my-calendar/my-calendar-details.component';
import MyCalendarService from '@/entities/my-calendar/my-calendar.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('MyCalendar Management Detail Component', () => {
    let wrapper: Wrapper<MyCalendarClass>;
    let comp: MyCalendarClass;
    let myCalendarServiceStub: SinonStubbedInstance<MyCalendarService>;

    beforeEach(() => {
      myCalendarServiceStub = sinon.createStubInstance<MyCalendarService>(MyCalendarService);

      wrapper = shallowMount<MyCalendarClass>(MyCalendarDetailComponent, {
        store,
        localVue,
        provide: { myCalendarService: () => myCalendarServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMyCalendar = { id: 123 };
        myCalendarServiceStub.find.resolves(foundMyCalendar);

        // WHEN
        comp.retrieveMyCalendar(123);
        await comp.$nextTick();

        // THEN
        expect(comp.myCalendar).toBe(foundMyCalendar);
      });
    });
  });
});
