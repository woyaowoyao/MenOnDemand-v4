/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TechnologyDetailComponent from '@/entities/technology/technology-details.vue';
import TechnologyClass from '@/entities/technology/technology-details.component';
import TechnologyService from '@/entities/technology/technology.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Technology Management Detail Component', () => {
    let wrapper: Wrapper<TechnologyClass>;
    let comp: TechnologyClass;
    let technologyServiceStub: SinonStubbedInstance<TechnologyService>;

    beforeEach(() => {
      technologyServiceStub = sinon.createStubInstance<TechnologyService>(TechnologyService);

      wrapper = shallowMount<TechnologyClass>(TechnologyDetailComponent, {
        store,
        localVue,
        provide: { technologyService: () => technologyServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTechnology = { id: 123 };
        technologyServiceStub.find.resolves(foundTechnology);

        // WHEN
        comp.retrieveTechnology(123);
        await comp.$nextTick();

        // THEN
        expect(comp.technology).toBe(foundTechnology);
      });
    });
  });
});
