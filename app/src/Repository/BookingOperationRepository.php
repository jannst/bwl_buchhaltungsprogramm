<?php

namespace App\Repository;

use App\Entity\BookingOperation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BookingOperation|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookingOperation|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookingOperation[]    findAll()
 * @method BookingOperation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingOperationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BookingOperation::class);
    }

    // /**
    //  * @return BookingOperation[] Returns an array of BookingOperation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BookingOperation
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
