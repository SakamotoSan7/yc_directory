'use client';
import { useState, useEffect } from 'react';
/* eslint-disable @next/next/no-img-element */
import { cn, formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { numberFormatting } from '@/lib/formatViews';
import { Skeleton } from './ui/skeleton';

export type StartupCardType = Omit<Startup, 'author'> & {
	author?: Author;
};

const StartupCard = ({ post }: { post: StartupCardType }) => {
	const {
		_createdAt,
		views,
		author,
		_id,
		description,
		image,
		category,
		title,
	} = post;

	const [imageUrl, setImageUrl] = useState(
		image ||
			'https://cf-assets.www.cloudflare.com/slt3lc6tev37/2poCmGSnGtmCDVyWdLvnex/744642fb854e71ae46f70f84910f6492/Cloudflare-for-startups-hero.png'
	);

	useEffect(() => {
		// Check image availability
		if (imageUrl) {
			fetch(imageUrl).then((res) => {
				if (res.ok) {
					setImageUrl(imageUrl);
				} else {
					setImageUrl(
						'https://cf-assets.www.cloudflare.com/slt3lc6tev37/2poCmGSnGtmCDVyWdLvnex/744642fb854e71ae46f70f84910f6492/Cloudflare-for-startups-hero.png'
					);
				}
			});
		}
	}, [imageUrl]);

	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className='startup-card-date'>{formatDate(_createdAt)}</p>

				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />

					<span className='text-16-medium'>
						{numberFormatting(views as number)}
					</span>
				</div>
			</div>

			<div className='flex-between mt-5 gap-5'>
				<div className='flex-1'>
					<Link href={`/user/${author?._id}`}>
						<p className='text-16-medium line-clamp-1'>
							{author?.name}
						</p>
					</Link>

					<Link href={`/startup/${_id}`}>
						<h3 className='text-26-semibold line-clamp-1'>
							{title}
						</h3>
					</Link>
				</div>

				<div>
					<Link href={`/user/${author?._id}`}>
						<Image
							src={author?.image || 'https://placehold.co/48x48'}
							alt={author?.name || 'placeholder'}
							width={48}
							height={48}
							className='rounded-full'
						/>
					</Link>
				</div>
			</div>

			<Link href={`/startup/${_id}`}>
				<p className='startup-card_desc'>{description}</p>

				<img
					src={imageUrl}
					alt='placeholder'
					className='startup-card_img'
				/>
			</Link>

			<div className='flex-between gap-3 mt-5'>
				<Link href={`/?query=${category?.toLowerCase()}`}>
					<p className='text-16-medium'>{category}</p>
				</Link>

				<Button
					className='startup-card_btn'
					asChild
				>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export const StartupCardSkeleton = () => (
	<>
		{[0, 1, 2, 3].map((i: number) => (
			<li key={cn('skeleton', i)}>
				<Skeleton className='startup-card_skeleton' />
			</li>
		))}
	</>
);

export default StartupCard;
