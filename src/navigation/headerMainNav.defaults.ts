import type { NavTreeItem } from './types';
import { APP_ROUTES } from '../config/routes';

/** Default desktop main nav for {@link Header} — replace at runtime via `mainNavItems` prop or merge from API. */
export const DEFAULT_HEADER_MAIN_NAV: readonly NavTreeItem[] = [
  {
    type: 'link',
    label: 'Youth',
    href: APP_ROUTES.youthProfile,
    linkClassName: 'fontchange14 youth lang_youth',
    spanClassName: '',
  },
  {
    type: 'link',
    label: 'Quiz & Essay',
    href: '/quiz',
    linkClassName: 'fontchange14',
    spanClassName: '',
  },
  {
    type: 'group',
    label: 'Voices',
    children: [
      {
        type: 'link',
        label: 'Blogs',
        href: '/voices/blogs',
        linkClassName: 'events fontchange14',
        spanClassName: 'lang_event',
      },
      {
        type: 'link',
        label: 'Newsletters',
        href: '/pages/newsletter',
        linkClassName: 'mission_yuva fontchange14',
        spanClassName: 'lang_exp_lrn01',
      },
    ],
  },
  {
    type: 'group',
    label: 'Events & Program',
    children: [
      {
        type: 'link',
        label: 'Experiential Learning',
        href: '/pages/experiential_learning?mode=I',
        linkClassName: 'mission_yuva fontchange14',
        spanClassName: 'lang_exp_lrn01',
      },
      {
        type: 'link',
        label: 'Volunteer for Bharat',
        href: '/pages/events',
        linkClassName: 'events fontchange14',
        spanClassName: 'lang_event',
      },
      {
        type: 'link',
        label: 'Mega Events',
        href: '/mega_events',
        linkClassName: 'mega_event fontchange14',
        spanClassName: 'lang_mega_event',
      },
      {
        type: 'link',
        label: 'VBYLD-2026',
        href: '/pages/vbyld_2026',
        linkClassName: 'mega_event fontchange14',
        spanClassName: 'lang_mega_event',
      },
    ],
  },
  {
    type: 'link',
    label: ' MY Bharat Podcast',
    href: '/pages/podcasts',
    linkClassName: 'mega_event fontchange14',
    spanClassName: 'lang_mega_event',
  },
  {
    type: 'link',
    label: 'BRICS India 2026',
    href: '/pages/brics_2026',
    linkClassName: 'mega_event fontchange14',
    spanClassName: 'lang_mega_event',
  },
];
