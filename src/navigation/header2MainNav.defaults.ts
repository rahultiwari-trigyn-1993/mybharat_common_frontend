import type { NavTreeItem } from './types';

/** Default desktop main nav for {@link Header2} — override with `mainNavItems` when loading from API. */
export const DEFAULT_HEADER2_MAIN_NAV: readonly NavTreeItem[] = [
  {
    type: 'group',
    label: 'MYBHARAT Diaspora',
    children: [
      {
        type: 'link',
        label: 'Friends of MY Bharat',
        href: '/pages/mb_friends',
        linkClassName: 'mission_yuva fontchange14',
        spanClassName: 'lang_exp_lrn01',
      },
      {
        type: 'link',
        label: 'International Youth Club',
        href: '/connect-international-youth-club',
        linkClassName: 'events fontchange14',
        spanClassName: 'lang_event',
      },
    ],
  },
  {
    type: 'link',
    label: 'Youth',
    href: 'https://web-beta.mybharats.in/youth-public-profile',
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
    label: 'Events & Program',
    children: [
      {
        type: 'link',
        label: 'Experiential Learning',
        href: '/elp/listing',
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
  {
    type: 'link',
    label: 'Mentorship',
    href: '/mentorship',
    linkClassName: 'mega_event fontchange14',
    spanClassName: 'lang_mega_event',
  },
  {
    type: 'link',
    label: 'Dice Roll Game',
    href: '/game/yuva',
    linkClassName: 'mega_event fontchange14',
    spanClassName: 'lang_mega_event',
  },
];
