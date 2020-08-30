/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TechnologyUpdateComponent from '@/entities/technology/technology-update.vue';
import TechnologyClass from '@/entities/technology/technology-update.component';
import TechnologyService from '@/entities/technology/technology.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Technology Management Update Component', () => {
    let wrapper: Wrapper<TechnologyClass>;
    let comp: TechnologyClass;
    let technologyServiceStub: SinonStubbedInstance<TechnologyService>;

    beforeEach(() => {
      technologyServiceStub = sinon.createStubInstance<TechnologyService>(TechnologyService);

      wrapper = shallowMount<TechnologyClass>(TechnologyUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          technologyService: () => technologyServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.technology = entity;
        technologyServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(technologyServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.technology = entity;
        technologyServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(technologyServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
