import type { CaseStudyItem, CaseStudySection } from '@/content/contracts/secondary'
import Image from 'next/image'

import { AnimatedText } from './AnimatedText.client'
import styles from './caseStudyStyles'

function Paragraphs({
  paragraphs,
  reveal = true,
}: {
  paragraphs: readonly string[]
  reveal?: boolean
}) {
  return paragraphs.flatMap((paragraph, index) =>
    paragraph.split('\n').map((line, lineIndex) =>
      reveal ? (
        <AnimatedText
          as="p"
          className={styles.paragraphLine}
          key={`${index}-${lineIndex}`}
          text={line}
        />
      ) : (
        <p className={styles.paragraphLine} key={`${index}-${lineIndex}`}>
          {line}
        </p>
      ),
    ),
  )
}

function SectionItem({
  item,
  textReveal = true,
  titleReveal = true,
}: {
  item: CaseStudyItem
  textReveal?: boolean
  titleReveal?: boolean
}) {
  const reveal = item.textReveal ?? textReveal
  return (
    <article className={`${styles.item} ${item.image ? styles.mediaItem : ''}`}>
      <div className={styles.itemCopy}>
        {item.title ? (
          <AnimatedText
            as="h3"
            text={item.title}
            strong={item.titleStrong}
            strongText={item.titleStrongText}
            reveal={item.titleReveal ?? titleReveal}
          />
        ) : null}
        {item.mobileParagraphs ? (
          <>
            <div className={styles.desktopOnly}>
              <Paragraphs paragraphs={item.paragraphs} reveal={reveal} />
            </div>
            <div className={styles.mobileOnly}>
              <Paragraphs paragraphs={item.mobileParagraphs} reveal={reveal} />
            </div>
          </>
        ) : (
          <Paragraphs paragraphs={item.paragraphs} reveal={reveal} />
        )}
      </div>
      {item.image ? (
        <div className={styles.itemImage} data-case-entry="image">
          <Image
            alt={item.image.alt}
            height={item.image.height}
            sizes="(max-width: 809px) 100vw, 70vw"
            src={item.image.src}
            width={item.image.width}
          />
        </div>
      ) : null}
    </article>
  )
}

function SectionHeading({ section }: { section: CaseStudySection }) {
  return (
    <>
      {section.title ? (
        <AnimatedText
          as="h2"
          className={`${styles.sectionTitle} ${section.mobileTitle ? styles.desktopOnly : ''}`}
          text={section.title}
          strong={section.titleStrong}
          reveal={section.titleReveal}
        />
      ) : null}
      {section.mobileTitle ? (
        <AnimatedText
          as="h2"
          className={`${styles.sectionTitle} ${styles.mobileOnly}`}
          text={section.mobileTitle}
          reveal={section.titleReveal}
        />
      ) : null}
      {section.intro ? (
        <div className={styles.sectionIntro}>
          <Paragraphs paragraphs={section.intro} reveal={section.introReveal ?? true} />
        </div>
      ) : null}
    </>
  )
}

function SectionDetails({ section }: { section: CaseStudySection }) {
  return (
    <>
      {section.introBlocks ? (
        <div className={styles.leadBlocks}>
          {section.introBlocks.map((block, index) => {
            if (block.type === 'list') {
              const List = block.ordered ? 'ol' : 'ul'
              return (
                <List key={index}>
                  {block.items.map((text) => (
                    <li key={text}>
                      <AnimatedText as="h3" text={text} />
                    </li>
                  ))}
                </List>
              )
            }
            return (
              <AnimatedText
                key={index}
                as={block.type === 'heading' ? 'h3' : 'p'}
                text={block.text}
                breakableWords={block.breakableWords}
              />
            )
          })}
        </div>
      ) : null}
      {section.bulletItems ? (
        <ul className={styles.bulletItems}>
          {section.items
            ?.flatMap((item) => item.paragraphs)
            .map((text) => (
              <li key={text}>
                <AnimatedText as="h3" text={text} />
              </li>
            ))}
        </ul>
      ) : null}
      {!section.bulletItems && section.items?.length ? (
        <div className={styles.items}>
          {section.items.map((item, index) => (
            <div
              className={`${styles.itemReveal} ${!item.title ? styles.proseItem : ''} ${!item.paragraphs.length && !item.image ? styles.groupHeading : ''}`}
              key={`${section.id}-${item.title ?? 'item'}-${index}`}
            >
              <SectionItem
                item={item}
                textReveal={section.textReveal}
                titleReveal={section.itemTitleReveal}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export function CaseSection({ section, slug }: { section: CaseStudySection; slug: string }) {
  const talinty = slug === 'talinty-ai-recruitment-platform'
  const headerEntry = !talinty && section.id === 'solutions'
  const innerEntry = ['results', 'conclusion'].includes(section.id)
  const fullEntry = !talinty && ['services', 'challenges', 'strategy'].includes(section.id)
  const divided = ['solutions', 'results', 'conclusion'].includes(section.id)
  const label = <p className={styles.sectionLabel}>{section.label}</p>

  return (
    <section
      className={`${styles.contentSection} ${styles[section.id] ?? ''} ${headerEntry ? styles.splitSection : ''} ${divided ? styles.dividedSection : ''}`}
      id={section.id}
      data-case-entry={fullEntry ? 'section' : undefined}
    >
      {divided ? (
        <span aria-hidden="true" className={styles.caseDivider} data-case-entry="divider" />
      ) : null}
      {section.id === 'conclusion' ? (
        <span
          aria-hidden="true"
          className={`${styles.caseDivider} ${styles.caseDividerEnd}`}
          data-case-entry="divider"
        />
      ) : null}
      {slug === 'mazad-al-jomrok-use-case' && section.id === 'results' ? (
        <>
          <span
            aria-hidden="true"
            className={`${styles.caseDivider} ${styles.mazadDividerAfter}`}
            data-case-entry="divider"
          />
          <span
            aria-hidden="true"
            className={`${styles.caseDivider} ${styles.mazadDividerAfterLast}`}
            data-case-entry="divider"
          />
        </>
      ) : null}
      {headerEntry ? (
        <>
          <div className={styles.sectionEntrance} data-case-entry="section">
            {label}
            <div className={styles.sectionBody}>
              <SectionHeading section={section} />
            </div>
          </div>
          <div className={`${styles.sectionBody} ${styles.sectionDetails}`}>
            <SectionDetails section={section} />
          </div>
        </>
      ) : (
        <div
          className={innerEntry ? styles.sectionEntrance : styles.sectionContents}
          data-case-entry={innerEntry ? 'section' : undefined}
        >
          {label}
          <div className={styles.sectionBody}>
            <SectionHeading section={section} />
            <SectionDetails section={section} />
          </div>
        </div>
      )}
    </section>
  )
}
