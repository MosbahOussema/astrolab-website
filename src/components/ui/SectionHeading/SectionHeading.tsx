import styles from './SectionHeading.module.css'
export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className={styles.heading}>
      <p className={styles.label}>{label}</p>
      <h2>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
