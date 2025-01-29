import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { PlayList } from 'src/playlists/entities/playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;

  @OneToMany(() => PlayList, (playlist) => playlist.user)
  playlists: PlayList[];
}
