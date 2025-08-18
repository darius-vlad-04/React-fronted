import styles from './TagContainer.module.css';

interface TagsContainerProps {
    tags: string[];
}

export default function TagsContainer({tags}: TagsContainerProps) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className={styles['tags-wrapper']}>
            {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
          {tag}
        </span>
            ))}
        </div>
    );
}