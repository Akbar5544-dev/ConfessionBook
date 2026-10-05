/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Image, Share, StyleSheet, Text } from 'react-native';
import App from '../App';
import AppIcon from '../components/AppIcon';
import { ONBOARDING_PAGES } from '../screens/OnboardingScreen/models';
import colors from '../utils/colors';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

let activeRenderer: ReactTestRenderer.ReactTestRenderer | undefined;

afterEach(() => {
  if (activeRenderer) {
    ReactTestRenderer.act(() => activeRenderer?.unmount());
    activeRenderer = undefined;
  }
  jest.restoreAllMocks();
});

const pressButton = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  label: string,
) => {
  const text = renderer.root
    .findAllByType(Text)
    .find(candidate => candidate.props.children === label);
  let button = text;

  while (
    button &&
    typeof button.props.onPress !== 'function' &&
    button.parent
  ) {
    button = button.parent;
  }

  expect(button && typeof button.props.onPress).toBe('function');
  ReactTestRenderer.act(() => button?.props.onPress());
};

const pressTestId = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  testID: string,
) => {
  const button = renderer.root.findByProps({ testID });
  expect(typeof button.props.onPress).toBe('function');
  ReactTestRenderer.act(() => button.props.onPress());
};

const swipeSlide = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  dx: number,
  dy = 0,
) => {
  const slide = renderer.root.findByProps({ testID: 'onboarding-slide' });
  ReactTestRenderer.act(() =>
    slide.props.onTouchStart({
      nativeEvent: { pageX: 200, pageY: 200 },
    }),
  );
  ReactTestRenderer.act(() =>
    slide.props.onTouchEnd({
      nativeEvent: { pageX: 200 + dx, pageY: 200 + dy },
    }),
  );
};

test('moves through onboarding and enters VEIL', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  const firstArtwork = renderer!.root.findByType(Image);
  const artworkStyle = StyleSheet.flatten(firstArtwork.props.style);

  expect(firstArtwork.props.source).toBe(ONBOARDING_PAGES[0].artwork);
  expect(firstArtwork.props.resizeMode).toBe('contain');
  expect(artworkStyle.width).toBe(artworkStyle.height);
  expect(artworkStyle.width).toBeLessThanOrEqual(350);
  expect(
    renderer!.root.findByProps({
      children: 'Be yourself.\nStay unknown.',
    }),
  ).toBeTruthy();
  pressButton(renderer!, 'Continue');
  expect(renderer!.root.findByType(Image).props.source).toBe(
    ONBOARDING_PAGES[1].artwork,
  );
  expect(
    renderer!.root.findByProps({
      children: 'Real thoughts.\nReal connections.',
    }),
  ).toBeTruthy();

  pressButton(renderer!, 'Continue');
  expect(renderer!.root.findByType(Image).props.source).toBe(
    ONBOARDING_PAGES[2].artwork,
  );
  expect(
    renderer!.root.findByProps({
      children: 'Your voice.\nA little amplified.',
    }),
  ).toBeTruthy();

  pressButton(renderer!, 'Enter VEIL');
  expect(
    renderer!.root.findByProps({ children: 'Moonlit Fox' }),
  ).toBeTruthy();
});

test('Skip enters VEIL from the first onboarding page', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Skip');
  expect(
    renderer!.root.findByProps({ children: 'Moonlit Fox' }),
  ).toBeTruthy();
});

test('swipes between onboarding pages in both directions', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  swipeSlide(renderer!, -100);
  expect(renderer!.root.findByType(Image).props.source).toBe(
    ONBOARDING_PAGES[1].artwork,
  );

  swipeSlide(renderer!, 100);
  expect(renderer!.root.findByType(Image).props.source).toBe(
    ONBOARDING_PAGES[0].artwork,
  );
});

test('navigates between HomeScreen bottom tabs', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  expect(
    renderer!.root.findByProps({ children: 'Moonlit Fox' }),
  ).toBeTruthy();
  expect(renderer!.root.findAllByProps({ children: 'Create' }).length).toBeGreaterThan(0);
  expect(renderer!.root.findAllByProps({ children: 'AI' }).length).toBeGreaterThan(0);
  expect(renderer!.root.findAllByProps({ children: 'You' }).length).toBeGreaterThan(0);

  pressButton(renderer!, 'Explore');
  expect(
    renderer!.root.findAllByProps({ children: 'Explore' }).length,
  ).toBeGreaterThan(0);
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });

  pressTestId(renderer!, 'explore-back');
  expect(
    renderer!.root.findByProps({ children: 'Moonlit Fox' }),
  ).toBeTruthy();
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });
});

test('opens the Reels screen from the feed and returns to Following', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });
  pressButton(renderer!, 'Reels');
  expect(
    renderer!.root.findByProps({ children: 'Take the scenic route.' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: 'Moonlit Fox' }),
  ).toBeTruthy();
  expect(renderer!.root.findAllByProps({ children: 'Create' }).length).toBeGreaterThan(0);

  pressButton(renderer!, '1.2k');
  expect(renderer!.root.findByProps({ children: '1.3k' })).toBeTruthy();

  pressButton(renderer!, 'Following');
  expect(
    renderer!.root.findByProps({
      placeholder: 'Search thoughts, reels, aliases',
    }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: 'Following' }).parent
      ?.props.accessibilityState,
  ).toEqual({ selected: true });
});

test('explores trending topics and opens searchable results', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });
  pressButton(renderer!, 'Explore');
  expect(
    renderer!.root.findByProps({ children: 'Find your kind of world' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: '#smallwins' }),
  ).toBeTruthy();

  pressButton(renderer!, '#smallwins');
  expect(
    renderer!.root.findByProps({ children: 'You can start again. As many times as you need.' }),
  ).toBeTruthy();

  pressTestId(renderer!, 'explore-result-tab-Reels');
  expect(
    renderer!.root.findByProps({ children: 'A quieter kind of progress' }),
  ).toBeTruthy();

  pressTestId(renderer!, 'explore-back');
  expect(
    renderer!.root.findByProps({ children: 'Trending conversations' }),
  ).toBeTruthy();
});

test('toggles post reactions and submits replies below the feed post', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');

  const likeIcon = () =>
    renderer!.root
      .findAllByType(AppIcon)
      .find(icon => icon.props.name === 'thumbUp');
  expect(likeIcon()?.props.color).toBe(colors.textSecondary);
  pressTestId(renderer!, 'post-like');
  expect(renderer!.root.findByProps({ children: '129' })).toBeTruthy();
  expect(likeIcon()?.props.color).toBe(colors.accent);
  pressTestId(renderer!, 'post-like');
  expect(renderer!.root.findByProps({ children: '128' })).toBeTruthy();
  expect(likeIcon()?.props.color).toBe(colors.textSecondary);
  expect(renderer!.root.findAllByProps({ testID: 'post-dislike' })).toHaveLength(0);

  expect(
    renderer!.root.findAllByProps({
      children: 'Needed this today. Thank you for putting it into words.',
    }),
  ).toHaveLength(0);
  pressTestId(renderer!, 'post-comments');
  expect(
    renderer!.root.findByProps({ children: '24 replies' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({
      children: 'Needed this today. Thank you for putting it into words.',
    }),
  ).toBeTruthy();

  pressTestId(renderer!, 'post-comments');
  expect(
    renderer!.root.findAllByProps({
      children: 'Needed this today. Thank you for putting it into words.',
    }),
  ).toHaveLength(0);
  pressTestId(renderer!, 'post-comments');

  const replyInput = renderer!.root.findByProps({
    accessibilityLabel: 'Add a kind reply',
  });
  ReactTestRenderer.act(() =>
    replyInput.props.onChangeText('A kind new reply'),
  );
  pressTestId(renderer!, 'send-reply');

  expect(
    renderer!.root.findByProps({ children: 'A kind new reply' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: '25 replies' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({
      accessibilityLabel: 'Add a kind reply',
    }).props.value,
  ).toBe('');
});

test('opens the native share sheet with the post content', async () => {
  const shareSpy = jest
    .spyOn(Share, 'share')
    .mockResolvedValue({
      action: Share.sharedAction,
      activityType: undefined,
    });
  let shareRenderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    shareRenderer = ReactTestRenderer.create(<App />);
    activeRenderer = shareRenderer;
    await Promise.resolve();
  });

  pressButton(shareRenderer!, 'Continue');
  pressButton(shareRenderer!, 'Continue');
  pressButton(shareRenderer!, 'Enter VEIL');
  await ReactTestRenderer.act(async () => {
    shareRenderer!.root.findByProps({ testID: 'post-share' }).props.onPress();
    await Promise.resolve();
  });

  expect(shareSpy).toHaveBeenCalledWith({
    message: 'Found a little quiet in the chaos. #slowdays #somewherebeautiful',
    title: 'Share this post',
  });
});

test('creates a post through media privacy, AI writing, preview, and publish', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  pressButton(renderer!, 'Create');

  expect(
    renderer!.root.findByProps({ children: "What's on your mind?" }),
  ).toBeTruthy();
  pressButton(renderer!, 'Add photo or video');
  expect(
    renderer!.root.findByProps({ children: 'Before you share' }),
  ).toBeTruthy();
  pressButton(renderer!, 'Blur faces');
  pressButton(renderer!, 'Use this media');

  expect(
    renderer!.root.findByProps({
      children: 'Media added · privacy checks enabled',
    }),
  ).toBeTruthy();
  pressButton(renderer!, 'Write with AI');
  pressButton(renderer!, 'Shorten');
  expect(
    renderer!.root.findByProps({ children: 'Small progress still counts.' }),
  ).toBeTruthy();
  pressButton(renderer!, 'Use this version');
  expect(
    renderer!.root.findByProps({
      accessibilityLabel: 'Write your post',
    }).props.value,
  ).toBe('Small progress still counts.');

  pressButton(renderer!, 'Preview post');
  expect(renderer!.root.findByProps({ children: 'Ready to share?' })).toBeTruthy();
  pressButton(renderer!, 'Everyone in VEIL');
  expect(
    renderer!.root.findByProps({ children: 'People you follow' }),
  ).toBeTruthy();
  pressButton(renderer!, 'Publish post');
  expect(
    renderer!.root.findByProps({
      placeholder: 'Search thoughts, reels, aliases',
    }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: 'Small progress still counts.' }),
  ).toBeTruthy();
});

test('opens the AI thought partner and sends a private prompt', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  pressButton(renderer!, 'AI');

  expect(
    renderer!.root.findByProps({ children: 'Your thought partner' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: 'Private AI space · not a public post' }),
  ).toBeTruthy();

  pressButton(renderer!, 'Help me express a feeling');
  expect(
    renderer!.root.findByProps({
      children:
        'Start with the feeling as it is. You could write: “I have been carrying a lot lately, and I am learning to give myself room to feel it.” What part of that feels closest to your experience?',
    }),
  ).toBeTruthy();

  const composer = renderer!.root.findByProps({
    accessibilityLabel: 'Message VEIL AI',
  });
  ReactTestRenderer.act(() => composer.props.onChangeText('Help me reflect on my day'));
  await ReactTestRenderer.act(async () => {
    renderer!.root.findByProps({ testID: 'ai-send-message' }).props.onPress();
    await Promise.resolve();
  });
  expect(
    renderer!.root.findByProps({ children: 'Help me reflect on my day' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findByProps({
      children:
        'Take a breath and think back: what challenged you today, and what is one thing you did well despite it?',
    }),
  ).toBeTruthy();
});

test('opens a user profile with profile posts and reels from the feed', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    activeRenderer = renderer;
    await Promise.resolve();
  });

  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Continue');
  pressButton(renderer!, 'Enter VEIL');
  pressButton(renderer!, 'Moonlit Fox');
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });

  expect(
    renderer!.root.findAllByProps({ children: 'Moonlit Fox' }).length,
  ).toBeGreaterThan(0);
  expect(
    renderer!.root
      .findAllByType(Text)
      .some(node => node.props.children?.toString().includes('moonlit.fox')),
  ).toBe(true);
  expect(renderer!.root.findByProps({ children: 'Collecting moments, sharing a little light.' })).toBeTruthy();
  expect(renderer!.root.findByProps({ children: 'You can start again. As many times as you need.' })).toBeTruthy();

  pressTestId(renderer!, 'profile-follow');
  expect(
    renderer!.root.findByProps({ children: 'Following · Tap to unfollow' }),
  ).toBeTruthy();

  pressTestId(renderer!, 'profile-back-home');
  expect(
    renderer!.root.findByProps({
      placeholder: 'Search thoughts, reels, aliases',
    }),
  ).toBeTruthy();
  pressButton(renderer!, 'You');
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 350));
  });
  expect(renderer!.root.findByProps({ children: 'Your space' })).toBeTruthy();
  expect(
    renderer!.root
      .findAllByType(Text)
      .some(node => node.props.children?.toString().includes('quiet.comet')),
  ).toBe(true);
  expect(renderer!.root.findByProps({ children: 'Edit anonymous profile' })).toBeTruthy();
  expect(renderer!.root.findAllByProps({ testID: 'profile-follow' })).toHaveLength(0);
  expect(
    renderer!.root
      .findAllByType(Text)
      .some(node => node.props.children === 'Saved'),
  ).toBe(true);
  pressButton(renderer!, 'Saved');
  expect(renderer!.root.findByProps({ children: 'Saved for later' })).toBeTruthy();
  expect(
    renderer!.root.findByProps({ children: 'Only you can see this collection' }),
  ).toBeTruthy();
  expect(
    renderer!.root.findAllByProps({
      children: 'Found a little quiet in the chaos.',
    }).length,
  ).toBeGreaterThan(0);
  expect(renderer!.root.findByProps({ children: 'Little reminders' })).toBeTruthy();
});
