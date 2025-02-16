import { expect, test } from '@playwright/test';
import { WEB_BASE_URL } from 'tests/constants';

test.describe('Publication attachments', () => {
  test('should have publication image', async ({ page }) => {
    const publicationId = '0x01cd87-0x02';
    await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

    const imageURL = `https://ik.imagekit.io/lens/media-snapshot/1eb3e9ff8dcab75cb573dbd7e45a44bdb759c4dc67e615ecc58d95f8bef9ef06.png`;
    const publicationImage = page
      .getByTestId(`publication-${publicationId}`)
      .getByTestId(`attachment-image-${imageURL}`);
    await expect(publicationImage).toBeVisible();

    // click image and check if it opens image lightbox and original image
    await publicationImage.click();
    const lightboxOpenOriginal = page.getByTestId('lightbox-open-original');
    await lightboxOpenOriginal.click();
    const newPage = await page.waitForEvent('popup');
    await expect(newPage.url()).toBe(imageURL);
  });

  test('should have publication video', async ({ page }) => {
    const publicationId = '0x01-0x01';
    await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

    const videoURL =
      'https://lens.infura-ipfs.io/ipfs/QmSPijepBo81hDLZ54qg3bKC2DpV9VFdaDJ81Y2viPHCRZ';
    const publicationVideo = page
      .getByTestId(`publication-${publicationId}`)
      .getByTestId(`attachment-video-${videoURL}`);
    await expect(publicationVideo).toBeVisible();
  });

  test.skip('should have publication audio', async () => {
    // TODO: add audio attachment
  });

  test.describe('Publication oembed', () => {
    test.skip('should have normal oembed', async ({ page }) => {
      const publicationId = '0x0d-0x0375';
      await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

      const publicationOembed = page
        .getByTestId(`publication-${publicationId}`)
        .getByTestId(
          'normal-oembed-https://testflight.apple.com/join/U9YkOlOy'
        );
      await expect(publicationOembed).toContainText(
        'Join the Uniswap Wallet beta'
      );
    });

    test('should have rich oembed', async ({ page }) => {
      const publicationId = '0x0d-0x02fb';
      await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

      const publicationOembed = page
        .getByTestId(`publication-${publicationId}`)
        .getByTestId('rich-oembed-https://lenstube.xyz/watch/0x24-0xe8');
      await expect(publicationOembed).toBeVisible();
    });
  });

  test.describe('Publication snapshot widget', () => {
    test('should have snapshot oembed', async ({ page }) => {
      const publicationId = '0x0c-0x2c';
      await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

      const snapshotWidget = page
        .getByTestId(`publication-${publicationId}`)
        .getByTestId(
          'snapshot-0x9287c40edcd68c362c7c4139fe3489bbaaa27cf4de68be5c218a82d0f252e718'
        );
      await expect(snapshotWidget).toContainText(
        'Do you like the Snapshot integration with Lenster?'
      );
      await expect(snapshotWidget).toContainText('Yes ser 🙌');
    });

    test('should have poll oembed', async ({ page }) => {
      const publicationId = '0x0d-0x03ce-DA-f4283318';
      await page.goto(`${WEB_BASE_URL}/posts/${publicationId}`);

      const pollWidget = page
        .getByTestId(`publication-${publicationId}`)
        .getByTestId(
          'poll-0x04e4c4bceee9ed9e54b6012d566d139e7c334829ddf27307fd11fd29882f7950'
        );
      await expect(pollWidget).toContainText('Yes ✅');
      await expect(pollWidget).toContainText('No ❎');
    });
  });
});
