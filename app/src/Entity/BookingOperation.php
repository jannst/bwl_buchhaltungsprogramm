<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"year": "exact"})
 * @ORM\Entity(repositoryClass="App\Repository\BookingOperationRepository")
 */
class BookingOperation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Account")
     * @JoinColumn(referencedColumnName="id", onDelete="CASCADE")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sollAccount;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Account")
     * @JoinColumn(referencedColumnName="id", onDelete="CASCADE")
     * @ORM\JoinColumn(nullable=false)
     */
    private $habenAccount;

    /**
     * @ORM\Column(type="float")
     */
    private $amount;

    /**
     * @ORM\Column(type="integer")
     */
    private $year;

    /**
     * @ORM\Column(type="datetime")
     */
    private $bookingDate;

    /**
     * @ORM\Column(type="integer")
     */
    private $runningNumber;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSollAccount(): ?Account
    {
        return $this->sollAccount;
    }

    public function setSollAccount(?Account $sollAccount): self
    {
        $this->sollAccount = $sollAccount;

        return $this;
    }

    public function getHabenAccount(): ?Account
    {
        return $this->habenAccount;
    }

    public function setHabenAccount(?Account $habenAccount): self
    {
        $this->habenAccount = $habenAccount;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getBookingDate(): ?\DateTimeInterface
    {
        return $this->bookingDate;
    }

    public function setBookingDate(\DateTimeInterface $bookingDate): self
    {
        $this->bookingDate = $bookingDate;

        return $this;
    }

    public function getRunningNumber(): ?int
    {
        return $this->runningNumber;
    }

    public function setRunningNumber(int $runningNumber): self
    {
        $this->runningNumber = $runningNumber;

        return $this;
    }
}
