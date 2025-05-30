//BookDisplayLocation
package com.bookhub.bookhub_back.entity;

import com.bookhub.bookhub_back.common.enums.DisplayType;
import com.bookhub.bookhub_back.entity.datetime.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
/*
* publishers 서윤
*book_display_locations 서윤
* discount_policies 서윤
* customer 서윤
customer_orders 서윤
customer_orders_detail 서윤
* */
@Entity
@Table(name = "book_display_locations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookDisplayLocation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_isbn",  nullable = false)
    private Book bookIsbn;

    @Column(name = "floor ", nullable = false)
    private String floor; //책이 위치한 층

    @Column(name = "hall ", nullable = false)
    private String hall; //책이 위치한 홀(A홀, B홀)

    @Column(name = "section", nullable = false)
    private String section; //책이 위치한 구역(23번 13번)

    @Enumerated(EnumType.STRING)
    @Column(name = "display_type ", nullable = false) //진열방식(책장, 평대)
    private DisplayType displayType;


}
