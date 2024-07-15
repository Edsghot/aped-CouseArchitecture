
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Course')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    IdCourse: number;

    @Column()
    Name: string;

    @Column()
    Duration: number; // In hours or minutes

    @Column('text')
    Description: string;

    @Column()
    TeacherName: string;

    @Column()
    Link: string;

    @Column()
    Category: string; // Updated from 'Clasifier' to 'Category' for clarity

    @Column()
    Price: number; // Price of the course

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    UpdatedAt: Date;

    @Column()
    Level: string; // e.g., Beginner, Intermediate, Advanced

    @Column()
    EnrollmentCount: number; // Number of students enrolled

    @Column()
    ImageUrl: string; // URL of the course thumbnail image
}

