/** @type {import('next').NextConfig} */

import withLitSSR from '@lit-labs/nextjs';

const lit = withLitSSR({
    addDeclarativeShadowDomPolyfill: true,
});
const nextConfig = {};

export default lit(nextConfig);
