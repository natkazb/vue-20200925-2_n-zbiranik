import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  let saveScrollPositionTo = null;
  try {
    saveScrollPositionTo = to.meta.saveScrollPosition;
  } catch (e) {
  }
  let saveScrollPositionFrom = null;
  try {
    saveScrollPositionFrom = from.meta.saveScrollPosition;
  } catch (e) {
  }
  if (saveScrollPositionTo && saveScrollPositionFrom) {
    return false;
  }
  if (savedPosition) {
    return savedPosition;
  } else if (to.hash) {
    return {
      selector: to.hash
    };
  } else {
    return { x: 0, y: 0 };
  }
}

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/02-ScrollBehavior',

  routes: [
    {
      path: '/',
      name: 'index',
      // alias: 'meeetups'
      // redirect: '/meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
