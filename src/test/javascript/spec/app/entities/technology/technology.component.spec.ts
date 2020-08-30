/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TechnologyComponent from '@/entities/technology/technology.vue';
import TechnologyClass from '@/entities/technology/technology.component';
import TechnologyService from '@/entities/technology/technology.service';

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
  describe('Technology Management Component', () => {
    let wrapper: Wrapper<TechnologyClass>;
    let comp: TechnologyClass;
    let technologyServiceStub: SinonStubbedInstance<TechnologyService>;

    beforeEach(() => {
      technologyServiceStub = sinon.createStubInstance<TechnologyService>(TechnologyService);
      technologyServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TechnologyClass>(TechnologyComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          technologyService: () => technologyServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      technologyServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTechnologys();
      await comp.$nextTick();

      // THEN
      expect(technologyServiceStub.retrieve.called).toBeTruthy();
      expect(comp.technologies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      technologyServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTechnology();
      await comp.$nextTick();

      // THEN
      expect(technologyServiceStub.delete.called).toBeTruthy();
      expect(technologyServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
