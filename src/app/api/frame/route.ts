import { NextRequest, NextResponse } from 'next/server';
import { Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import { FrameRequest } from '../../types/farcasterTypes';

const POST_URL = 'https://frames-yeet.vercel.app/api/frame';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log('POST received at /api/frame');

  const HUB_URL = process.env['HUB_URL'] || 'nemes.farcaster.xyz:2283';
  const client = getSSLHubRpcClient(HUB_URL);
  let validatedMessage: Message | undefined = undefined;
  try {
    const body: FrameRequest = await req.json();
    const frameMessage = Message.decode(
      Buffer.from(body?.trustedData?.messageBytes || '', 'hex')
    );
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid) {
      validatedMessage = result.value.message;
    }

    // Also validate the frame url matches the expected url
    let urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
    const urlString = Buffer.from(urlBuffer).toString('utf-8');
    if (!urlString.startsWith(process.env['HOST'] || '')) {
      throw new Error(`Invalid frame url: ${urlBuffer}`);
    }
  } catch (e) {
    throw new Error(`Failed to validate message: ${e}`);
  }

  const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
  const fid = validatedMessage?.data?.fid || 0;

  let NEW_IMAGE_URLimage = '';

  // Determine the image based on the buttonId
  switch (buttonId) {
    case 1:
      NEW_IMAGE_URLimage = 'https://frames-yeet.vercel.app/diarrhea.png';
      break;
    case 2:
      NEW_IMAGE_URLimage = 'https://frames-yeet.vercel.app/jaundice.png';
      break;
    case 3:
      NEW_IMAGE_URLimage = 'https://frames-yeet.vercel.app/banality.png';
      break;
    case 4:
      NEW_IMAGE_URLimage = 'https://frames-yeet.vercel.app/death.png';
      break;

    default:
      NEW_IMAGE_URLimage = 'https://frames-yeet.vercel.app/default-image.jpeg';
      break;
  }

  let html =
    `<!DOCTYPE html><html><head>` +
    `<meta property="fc:frame" content="vNext" />` +
    `<meta property="fc:frame:image" content="${NEW_IMAGE_URLimage}" />` +
    `<meta property="fc:frame:button:1" content="YEET" />` +
    `<meta property="fc:frame:button:2" content="YEET" />` +
    `<meta property="fc:frame:button:3" content="YEET" />` +
    `<meta property="fc:frame:button:4" content="YEET" />` +
    `<meta property="fc:frame:post_url" content="${POST_URL}" />` +
    `</head></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}

export const dynamic = 'force-dynamic';
